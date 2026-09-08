/* =====================================================
   律途 - 全站公共脚本
   负责：导航栏登录状态、退出登录、隐藏入口显示、
        移动端抽屉菜单开合
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

  // ========== 移动端抽屉菜单 ==========
  var navToggle = document.getElementById('nav-toggle');
  var navMask = document.getElementById('nav-mask');

  function setNavOpen(open) {
    document.body.classList.toggle('nav-open', open);
    if (navToggle) navToggle.textContent = open ? '✕' : '☰';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      setNavOpen(!document.body.classList.contains('nav-open'));
    });
  }

  if (navMask) {
    navMask.addEventListener('click', function() {
      setNavOpen(false);
    });
  }

  // 点抽屉里的链接：先收起再跳转
  var navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.addEventListener('click', function(e) {
      if (e.target && e.target.tagName === 'A') setNavOpen(false);
    });
  }

  // Esc 关闭
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') setNavOpen(false);
  });

  // 超过移动端断点时自动复位，避免遮罩残留
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) setNavOpen(false);
  });
})();
