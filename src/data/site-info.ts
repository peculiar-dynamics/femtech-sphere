export type SocialLink = {
  platform: string;
  href: string;
  me?: string;
  text: string;
  icon: string;
  footerOnly?: boolean;
  active?: boolean;
  footer?: boolean;
  contact?: boolean;
};
export type Page = {
  key: string;
  href: string;
  children?: Page[];
};

export type SiteInfo = {
  name: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  themeColor: string;
  favicon: string;
  twitterHandle: string;
  email: {
    defaultContact: string;
    defaultSubject: string;
  };
  business: {
    legalName: string;
    companiesReg: string;
    VATReg?: string;
    regAddress: string;
    tradingAddress?: string;
    phone?: string;
  };
  image: {
    src: string;
    alt: string;
  };
  socialLinks: SocialLink[];
  pages: Page[];
  navCta?: any;
  cookies?: any;
};

const siteInfo: SiteInfo = {
  name: "Astro", // business name SEO subtitle
  title: "Build the web you want", // tagline
  description:
    "Astro builds fast content sites, powerful web applications, dynamic server APIs, and everything in-between.",
  url: "https://astro.build", // public domain without closing /
  domain: "astro.build",
  themeColor: "#8D46E7",
  favicon: "/assets/favicon.svg",
  twitterHandle: "astrodotbuild",
  email: {
    defaultContact: "hello@email.com",
    defaultSubject: "Website Enquiry",
  },
  business: {
    legalName: "Business Ltd",
    companiesReg: "123456789",
    VATReg: "123456",
    regAddress: "221c Baker Street, London, NW1 6XE",
    tradingAddress: "42 Wallaby Way, Sydney",
    phone: "01234 567 890",
  },
  image: {
    src: "/og/social.jpg",
    alt: "Build the web you want",
  },
  socialLinks: [
    {
      platform: "github",
      href: "https://github.com/withastro/astro",
      me: "https://github.com/withastro/",
      text: "Go to Astro's GitHub repo",
      icon: "mdi:github",
    },
    {
      platform: "discord",
      href: "/chat",
      text: "Join the Astro community on Discord",
      icon: "mdi:discord",
    },
    {
      platform: "twitter",
      href: "https://twitter.com/astrodotbuild",
      me: "https://twitter.com/astrodotbuild",
      text: "Follow Astro on Twitter",
      icon: "mdi:twitter",
    },
    {
      platform: "facebook",
      href: "https://m.webtoo.ls/@astro",
      me: "https://m.webtoo.ls/@astro",
      text: "Follow Astro on Mastodon",
      footerOnly: true,
      icon: "mdi:facebook",
      active: true,
      footer: true,
      contact: true,
    },
    {
      platform: "instagram",
      href: "https://instagram.com/glosfarm",
      text: `Follow us on Instagram`,
      icon: "mdi:instagram",
      active: true,
      footer: true,
    },
    {
      platform: "google",
      href: "https://g.co/kgs/X6GJ3ry",
      text: "Find us on Google",
      icon: "mdi:google",
      active: true,
      footer: true,
    },
  ],
  pages: [
    {
      key: "Home",
      href: "/",
    },
    {
      key: "About Us",
      href: "/about/",
    },
    {
      key: "Services",
      href: "/services/",
      children: [
        {
          key: "Overview",
          href: "/services/",
        },
        {
          key: "Service 1",
          href: "/services/service1/",
        },
        {
          key: "Service 2",
          href: "/services/service2/",
        },
      ],
    },
    {
      key: "News",
      href: "/news/",
    },
    {
      key: "Contact",
      href: "/contact/",
    },
  ],
  navCta: {
    label: "Get a Quote",
    href: "/contact/",
  },
  cookies: {
    GA4: "G-XXXXXXXXXX",
    GTM: "GTM-XXXXXXXXX",
  },
};

export default siteInfo;
