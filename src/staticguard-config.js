import StaticGuard from 'staticguard';

StaticGuard.init({
  passwordHash: "210ba3adce0d2c9e4a3c30d0b84ffa0995ca2b8fa69ee0d1910e3732aa345e55",
  salt: "hey-boot-salt",
  headerText: "Private Site",
  subheaderText: "This content is password protected.",
  guardImage: "/gaurdian-sm2.png",
  theme: {
    primaryColor: "#8b4513",
    backgroundColor: "#faf8f6",
    pageBackgroundColor: "#3e2723",
    imageBackgroundColor: "#000000",
    borderColor: "#d4af37",
    textColor: "#342e29",
    errorColor: "#991b1b"
  }
});
