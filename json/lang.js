(function () {
    const supportedLangs = ['en', 'de', 'fr', 'es', 'pt', 'tr', 'ru', 'zh'];
    const browserLang = (navigator.language || navigator.userLanguage || 'en').substring(0, 2);

    const userLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

    localStorage.setItem('language', userLang);

})();