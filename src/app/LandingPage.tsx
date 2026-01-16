import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import logo from "../assets/LivLogo.png";
import heroImage from "../assets/HeroSection.png";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { UserIdModal } from "./components/UserIdModal";

// Preload images
const preloadImages = (imageUrls: string[]) => {
  return Promise.all(
    imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block loading
      });
    }),
  );
};

// Fade in animation component
const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    amount: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
      }
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

// Hero Section
const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setTextVisible(true), 300);
  }, []);

  return (
    <div className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-screen overflow-hidden bg-black">
      {/* Hero Image */}
      <img
        src={heroImage}
        alt="Welcome to Liv"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Logo positioned in top left */}
      <div className="relative z-10 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            textVisible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-6 sm:top-8 md:top-12 left-4 sm:left-6 md:left-8 lg:left-16"
        >
          <img
            src={logo}
            alt="Liv Collection Logo"
            className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto drop-shadow-lg"
            loading="eager"
          />
        </motion.div>
      </div>
    </div>
  );
};

// Intro Section
const IntroSection = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-[#F9F6F0]">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInSection>
          <h1
            className="text-4xl md:text-5xl mb-2 text-[#3E617F] tracking-tight"
            style={{
              fontFamily: "LovAssistante, sans-serif",
              fontWeight: 400,
            }}
          >
            .ברוכים הבאים הביתה
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div
            className="text-[#3E617F] space-y-6 leading-relaxed text-lg md:text-xl"
            dir="rtl"
            style={{
              fontFamily: "'Assistant', sans-serif",
              fontWeight: 200,
            }}
          >
            <p style={{ fontWeight: 700 }}>
              כשאתם חלק ממשפחת LIV - הבעלות על דירה מעניקה לכם
              הרבה מעבר לחופשה. היא פותחת עבורכם גישה לעולם של
              אירוח, חוויות והטבות – שנבנו עבור קהילת הבעלים
              שלנו.
            </p>
            <p>
              זה המקום להזמין, לתכנן ולחוות את החופשה הבאה שלכם,
              בתנאים שנוצרו במיוחד עבורכם:
            </p>

            <ul className="inline-block text-right space-y-4 py-4">
              {[
                "אפשרות להתארח בכל נכסי LIV במחירים מועדפים",
                "חופשות לאורך כל השנה, ללא עמלות",
                "חוויות ותוכן שנבנים לקהילת הבעלים",
                "גמישות, נוחות וסטנדרט אירוח אחיד",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#D46737] shrink-0" />
                  <span style={{ paddingRight: "3px" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-8 space-y-2">
              <p style={{ fontWeight: 700 }}>
                בוחרים מתחם אירוח ותאריכים,
              </p>
              <p
                className="text-[#D46737]"
                style={{ fontWeight: 700 }}
              >
                המערכת מזהה את זכאותכם כבעלי דירה - והמחיר
                המיוחד מוצג אוטומטית.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

// Hotel Card Component
const HotelCard = ({
  image,
  title,
  delay,
  link,
  onCardClick,
}: {
  image: string;
  title: string;
  delay: number;
  link: string;
  onCardClick: (link: string, title: string) => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCardClick(link, title);
  };

  // Split title into words for multi-line display
  const titleWords = title.split(" ");

  return (
    <FadeInSection delay={delay}>
      <div
        onClick={handleClick}
        className="group relative overflow-hidden aspect-[4/5] cursor-pointer block"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Title - Always top left */}
        <div className="absolute top-4 left-4 text-white">
          <h2
            className="text-2xl md:text-3xl uppercase"
            style={{
              fontFamily: "'Assistant', sans-serif",
              fontWeight: 700,
            }}
          >
            {titleWords.map((word, index) => (
              <span key={index}>
                {word}
                {index < titleWords.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Button - Always at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white"
          dir="rtl"
        >
          <button
            className="bg-[#f8f5f0] hover:bg-[#f8f5f0]/90 text-[#D46737] transition-all group/btn border border-white cursor-pointer w-full md:w-auto shadow-md px-3 py-1.5 md:px-4 md:py-2 rounded-md flex items-center justify-center gap-2 text-sm md:text-base"
            style={{
              fontFamily: "'Assistant', sans-serif",
              fontWeight: 200,
            }}
          >
            <span>להזמנה לחץ כאן</span>
            <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-[#D46737] transition-transform group-hover/btn:-translate-x-1" />
          </button>
        </div>
      </div>
    </FadeInSection>
  );
};

// Hotel Highlights Section
const HotelHighlights = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<{
    link: string;
    title: string;
  } | null>(null);

  const hotels = [
    {
      title: "Liv Mackenzie",
      image:
        "https://drive.google.com/thumbnail?id=1gujBnpIdiNs9x_UPM_ySDzLnVRaLwK3V&sz=w1000",
      link: "https://liv.reserve-online.net/?property=LIVMACKENZ",
    },
    {
      title: "Liv&co",
      image:
        "https://drive.google.com/thumbnail?id=1-_9CHxe63M7JWeT1E9pAmxsTCbnEwBGt&sz=w1000",
      link: "https://liv.reserve-online.net/?property=LIVCOLTD",
    },
    {
      title: "Liv Urban",
      image:
        "https://drive.google.com/thumbnail?id=1Ul1YO1mBFLiVp9nfke8Ms_DN0fMtyotR&sz=w1000",
      link: "https://liv.reserve-online.net/?property=LIVCOLLECT",
    },
    {
      title: "Liv The City",
      image:
        "https://drive.google.com/thumbnail?id=1-iaN4vWAvehj0frTs8_rqFOfx0d1SQp3&sz=w1000",
      link: "https://liv.reserve-online.net/?property=LIVTHECITY",
    },
  ];

  const handleCardClick = (link: string, title: string) => {
    setSelectedHotel({ link, title });
    setModalOpen(true);
  };

  const handleModalSubmit = (userId: string) => {
    if (selectedHotel) {
      // Store user ID in localStorage for future use
      localStorage.setItem("livOwnerId", userId);

      // Navigate to the URL with the user's ID as bkcode
      window.open(
        `${selectedHotel.link}&voucher=${userId}`,
        "_blank",
      );

      // Close modal
      setModalOpen(false);
      setSelectedHotel(null);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedHotel(null);
  };

  return (
    <section
      className="py-0 w-full"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <div className="w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {hotels.map((hotel, index) => (
            <HotelCard
              key={hotel.title}
              title={hotel.title}
              image={hotel.image}
              link={hotel.link}
              delay={index * 0.1}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      <UserIdModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        hotelName={selectedHotel?.title || ""}
      />
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const larnacaImages = [
    "https://drive.google.com/thumbnail?id=1h58Gy0wjMg7smnfwSeHsUlHm0YyWBnd4&sz=w1000",
    "https://drive.google.com/thumbnail?id=1uXHTm5zHaRYKSEO977lwjx5eyL4v-sTX&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Sa_krf5n6D7el4wKQr26NSWUr11933tY&sz=w1000",
    "https://drive.google.com/thumbnail?id=129dn9neQ8d456IbXyBOLuz0Au2PVE3Lj&sz=w1000",
    "https://drive.google.com/thumbnail?id=1x-bsf1pLq-WXAIyy9WTbWXAYpA8WOQM0&sz=w1000",
    "https://drive.google.com/thumbnail?id=1cY0ZRA2Jcx7DrYW6GBIHbKLKCdCP98bO&sz=w1000",
    "https://drive.google.com/thumbnail?id=1-iZKnDOnz5j1-hbvVTP7d-gJ7ZV1qZUI&sz=w1000",
    "https://drive.google.com/thumbnail?id=1SCo4jtL8lemoG5jq6v43HBVLW3LnsAhs&sz=w1000",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % larnacaImages.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % larnacaImages.length,
    );
  };

  return (
    <section
      className="py-16 px-4 md:px-8"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h2
            className="text-4xl md:text-5xl mb-8 text-center text-[#3E617F]"
            style={{
              fontFamily: "Love, serif",
              fontWeight: 400,
            }}
          >
            Discover Larnaca
          </h2>
        </FadeInSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInSection delay={0.3}>
            <div
              className="text-[#3E617F] space-y-6"
              dir="rtl"
              style={{
                fontFamily: "'Assistant', sans-serif",
                fontWeight: 200,
              }}
            >
              <p className="leading-relaxed">
                כחלק מקהילת הבעלים של LIV, אנו מזמינו אתכם
                לחוויה ייחודית שמחברת בין העיר, האנשים והדרך שבה
                נולדה LIV. סיור היכרות אינטימי בלרנקה, המיועד
                לבעלי דירות בלבד,
              </p>
              <p className="leading-relaxed">
                מאפשר לכם להכיר מקרוב את הסביבה והאווירה שבה
                נמצא הבית שלכם, לפגוש את הצוות שמאחורי המותג
                ולחוות מקרוב את האווירה המקומית שהופכת את LIV
                למה שהיא. הסיור משלב תרבות, קולינריה מקומית,
                ביקור בפרויקטים של הרשת ומפגש אישי עם הנהלת
                הרשת.
              </p>

              <div className="space-y-4">
                <p className="leading-relaxed font-bold">
                  פרטי הסיור
                </p>
                <ul className="inline-block text-right space-y-4 py-4">
                  {[
                    "מחיר מיוחד לבעלי דירות",
                    "כולל ליווי, תחבורה, אוכל ושתייה",
                    "מתקיים בסופי שבוע",
                    "להרשמה ותיאום מראש מול פריסילה ",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#D46737] shrink-0" />
                      <span style={{ paddingRight: "15px" }}>
                        {item}
                        {idx === 3 && (
                          <a
                            href="https://wa.me/972506464014?text=%D7%94%D7%99%D7%99%20%D7%A4%D7%A8%D7%99%D7%A1%D7%99%D7%9C%D7%94%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%A1%D7%99%D7%95%D7%A8%20%D7%91%D7%A2%D7%9C%D7%99%D7%9D%20%D7%91%D7%9C%D7%A8%D7%A0%D7%A7%D7%94%20%3A%29"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D46737] underline hover:opacity-80 transition-opacity"
                            style={{ fontWeight: 700 }}
                          >
                            לחץ כאן
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F9F6F0] p-6 rounded-lg">
                <p className="mb-4">
                  <span className="text-[#D46737]">מחיר:</span>{" "}
                  €80 לאדם / €160 לזוג
                </p>
                <p className="text-sm opacity-80">
                  ניתן להוסיף את הסיור בעת ההזמנה.
                </p>
              </div>

              <a
                href="https://liv.reserve-online.net/about"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div
              className="rounded-lg overflow-hidden aspect-video relative cursor-pointer"
              onClick={handleImageClick}
            >
              {larnacaImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      currentImageIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={image}
                    alt={`Larnaca ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {larnacaImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === index
                        ? "bg-white w-8"
                        : "bg-white/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    "https://drive.google.com/thumbnail?id=17d3fWqejJOaWZRkh2-iffHeB3pTbYVjs&sz=w1000",
    "https://drive.google.com/thumbnail?id=12IwOaWhFfQfXgcK9sAZAEqDdINNkXiWJ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1GE3dQg6gBYXt9gGRXJOMKHCJTgtONHTh&sz=w1000",
    "https://drive.google.com/thumbnail?id=1qto2JpQu2OXLx6LifVFKx4ZMbRoatqhp&sz=w1000",
    "https://drive.google.com/thumbnail?id=1jlXrAw-khGzAcc9NpZ1QI72gddI_bqP0&sz=w1000",
    "https://drive.google.com/thumbnail?id=1njiTSEFCaZHeoGS-cK74RmwwuaM_w96Z&sz=w1000",
    "https://drive.google.com/thumbnail?id=1ONfwzQWNMrYhLOGhnziMwcQmpSbzXu6G&sz=w1000",
    "https://drive.google.com/thumbnail?id=1O5aNIuaXMgLfNiP13PZ1Ya_zokHtnY9D&sz=w1000",
    "https://drive.google.com/thumbnail?id=1yc398zZSUiYixQIkb5QrtwGkI4gw0Lxe&sz=w1000",
    "https://drive.google.com/thumbnail?id=1IDM7tHqmmV7WB_ibbi1L-NfG8DFlYvf-&sz=w1000",
    "https://drive.google.com/thumbnail?id=1rC4rcqjMDzEkfuwku3eWzmNGoOkFsnWL&sz=w1000",
    "https://drive.google.com/thumbnail?id=1R8rrI3fvPs6gwkJDj3pI8y8ncefjbnnd&sz=w1000",
    "https://drive.google.com/thumbnail?id=1AMhnYdE8lny44PnctvgEREeqhd5-_Do_&sz=w1000",
    "https://drive.google.com/thumbnail?id=11XeRQ3tpbh8Pyd6NrZaUY7H_X4voRGnK&sz=w1000",
    "https://drive.google.com/thumbnail?id=1FrWkyNSHb5x7EhRLVdhDrhO_ZcKlAV22&sz=w1000",
    "https://drive.google.com/thumbnail?id=1gndP47IsoMoc2QpskrBbtl8DQetgnULm&sz=w1000",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % carouselImages.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % carouselImages.length,
    );
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-[#F9F6F0]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div
              className="space-y-6 text-[#3E617F]"
              dir="rtl"
              style={{
                fontFamily: "'Assistant', sans-serif",
                fontWeight: 200,
              }}
            >
              <h2
                className="text-4xl md:text-5xl mb-8 text-center"
                style={{
                  fontFamily: "Love, serif",
                  fontWeight: 400,
                }}
              >
                LIV your Way
              </h2>
              <p className="leading-relaxed">
                LIV נולדה מתוך תפיסה של חופש, קהילה ואירוח בעולם
                החדש.
              </p>
              <p className="leading-relaxed">
                לא מלון, לא דירה להשכרה – אלא אוסף של חוויות
                ואנשים שחולקים דרך חיים אחת.
              </p>
              <p className="leading-relaxed">
                כחלק מהחוויה, בעלי דירות ואורחים נהנים משירותים
                משלימים שהופכים כל שהות לפשוטה ונעימה יותר –
                מרגעי וולנס ופעילויות תוכן נבחרות, דרך נוחות
                יומיומית ועד שירות אישי שמרגיש טבעי ופשוט.
              </p>
              <p className="leading-relaxed">
                אנו מזמינו אתכם, לגלות ולחוות את האיים הקסומים
                שלנו דרך קהילה אחת חמה שמחברת בין כולם.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div
              className="rounded-lg overflow-hidden aspect-[4/3] relative cursor-pointer"
              onClick={handleImageClick}
            >
              {carouselImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity:
                      currentImageIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={image}
                    alt={`Liv Collection ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === index
                        ? "bg-white w-8"
                        : "bg-white/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-[#3E617F] text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <div
              className="text-2xl mb-2"
              style={{
                fontFamily: "Love, serif",
                fontWeight: 400,
                letterSpacing: "0.1em",
              }}
            >
              LIV COLLECTION
            </div>
            <p
              className="text-sm opacity-80"
              style={{
                fontFamily: "Love, serif",
                fontWeight: 400,
              }}
            >
              Owners Club
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            <a
              href="#"
              className="hover:text-[#D46737] transition-colors"
              style={{
                fontFamily: "Love, serif",
                fontWeight: 400,
              }}
            >
              Home
            </a>
            <a
              href="https://www.livcollections.com"
              className="hover:text-[#D46737] transition-colors"
              style={{
                fontFamily: "Love, serif",
                fontWeight: 400,
              }}
            >
              LivCollection.com
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-70">
          <p
            style={{
              fontFamily: "Love, serif",
              fontWeight: 400,
            }}
          >
            Copyright © {new Date().getFullYear()} Liv
            Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <IntroSection />
      <HotelHighlights />
      <ExperienceSection />
      <AboutSection />
      <Footer />
    </div>
  );
}