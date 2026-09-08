/* =====================================================
   律途 - 全站公共脚本
   负责：导航栏登录状态、退出登录、隐藏入口显示
   使用 IIFE 独立作用域，不污染各页面的业务变量
   ===================================================== */

(function() {
  var currentUserStr = localStorage.getItem('faqiao_currentUser');

  // ========== 导航栏按钮 ==========
  var userBtn = document.getElementById('nav-user-btn');
  if (userBtn && currentUserStr) {
    var user = JSON.parse(currentUserStr);
    userBtn.textContent = '👤 ' + user.phone + ' | 退出';
    userBtn.href = '#';
    userBtn.onclick = function() {
      localStorage.removeItem('faqiao_currentUser');
      alert('已退出登录');
      window.location.reload();
    };
  }

  // ========== 案件池入口（登录可见） ==========
  if (currentUserStr) {
    var poolEntry = document.getElementById('case-pool-entry');
    if (poolEntry) poolEntry.style.display = 'inline';
  }

  // ========== 个人主页入口（登录可见） ==========
  if (currentUserStr) {
    var profileEntry = document.getElementById('profile-entry');
    if (profileEntry) profileEntry.style.display = 'inline';
  }

  // ========== 后台入口（管理员模式可见） ==========
  if (localStorage.getItem('faqiao_adminMode') === 'true') {
    var adminEntry = document.getElementById('admin-entry');
    if (adminEntry) adminEntry.style.display = 'inline';
  }
})();
