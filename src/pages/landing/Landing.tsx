import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/Footer";
import { NavLink } from "react-router";
import { Button } from "../../components/button/Button";
import "./Landing.css";
import PawplayLogo from "../../imgs/Logo-black.svg";
import webvideo from "./imgs/webvideo.mp4";
import mockup from "./imgs/mockup.png";
import mockup1 from "./imgs/mockup1.png";
import img1 from "./imgs/IMG-1.png";
import img2 from "./imgs/IMG-2.png";
import img3 from "./imgs/IMG-3.png";
import magnify from "./imgs/magnify.png";
import keyFeaturesMockup from "./imgs/key-features.png";
import tennisBall from "./imgs/tennis-ball.png";
import contentSave from "./imgs/content-save.png";
import dog from "./imgs/dog.png";
import socialMockup from "./imgs/social-mockup.png";
import Liam from "./imgs/Liam.webp";
import Oliver from "./imgs/Oliver.webp";
import Owen from "./imgs/Owen.webp";
import Ethan from "./imgs/Ethan.webp";
import Jordan from "./imgs/Jordan.webp";
import Samantha from "./imgs/Samantha.webp";
import Olivia from "./imgs/Olivia.webp";
import Emma from "./imgs/Emma.webp";
import Charlotte from "./imgs/Charlotte.webp";
import Emily from "./imgs/Emily.webp";
import Riley from "./imgs/Riley.webp";
import Ava from "./imgs/Ava.webp";

export const Landing = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    // Auto-cycle through steps every 3 seconds
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentStep((prevStep: number) => (prevStep + 1) % 3);
    }, 3000);

    // Tilt effect for key features cards
    const tiltCards = document.querySelectorAll<HTMLElement>("[data-tilt]");

    const eventListeners = new Map<
      HTMLElement,
      { move: (e: MouseEvent) => void; leave: () => void }
    >();

    tiltCards.forEach((card) => {
      const mouseMoveHandler = (e: MouseEvent) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;

        const rotateX = (mouseY / cardRect.height) * -20;
        const rotateY = (mouseX / cardRect.width) * 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const mouseLeaveHandler = () => {
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      };

      card.addEventListener("mousemove", mouseMoveHandler);
      card.addEventListener("mouseleave", mouseLeaveHandler);

      eventListeners.set(card, {
        move: mouseMoveHandler,
        leave: mouseLeaveHandler,
      });
    });

    // Hover effect for testimonial images
    const opinionImages = document.querySelectorAll<HTMLElement>(
      ".opinion-card__image"
    );

    const imageEventListeners = new Map<
      HTMLElement,
      { enter: () => void; leave: () => void }
    >();

    opinionImages.forEach((image) => {
      const mouseEnterHandler = () => {
        image.style.transform = "scale(1.15)";
      };

      const mouseLeaveHandler = () => {
        image.style.transform = "scale(1)";
      };

      image.addEventListener("mouseenter", mouseEnterHandler);
      image.addEventListener("mouseleave", mouseLeaveHandler);

      imageEventListeners.set(image, {
        enter: mouseEnterHandler,
        leave: mouseLeaveHandler,
      });
    });

    return () => {
      clearInterval(interval);

      tiltCards.forEach((card) => {
        const listeners = eventListeners.get(card);
        if (listeners) {
          card.removeEventListener("mousemove", listeners.move);
          card.removeEventListener("mouseleave", listeners.leave);
        }
      });

      opinionImages.forEach((image) => {
        const listeners = imageEventListeners.get(image);
        if (listeners) {
          image.removeEventListener("mouseenter", listeners.enter);
          image.removeEventListener("mouseleave", listeners.leave);
        }
      });
    };
  }, []);

  return (
    <div>
      <div className='landing--header'>
        <NavLink to='/'>
          <img src={PawplayLogo} alt='PawPlay Icon' />
        </NavLink>
        <NavLink to='/'>
          <Button className='primary'> Join now</Button>
        </NavLink>
      </div>
      <section className='hero'>
        <div className='hero__container'>
          <div className='hero__content'>
            <h1 className='hero__title'>Connect your dog with new friends</h1>
            <p className='hero__subtitle'>
              Discover nearby meetups, connect with dog lovers, and give your
              pup the social life they deserve.
            </p>
            <button className='hero__button'>Start your journey</button>
          </div>
          <div className='hero__mockup'>
            <div
              className='hero__phone'
              style={{
                backgroundImage: `url(${mockup})`,
              }}
            >
              <video
                className='hero__video'
                preload='none'
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={webvideo} type='video/mp4' />
                Tu navegador no soporta el elemento video.
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className='how-it-works'>
        <h2 className='how-it-works__title'>How it works?</h2>

        <div className='how-it-works__container'>
          <div className='how-it-works__mockup'>
            <img
              src={mockup1}
              alt='Phone Mockup'
              className='how-it-works__mockup-img'
            />
            <div className='how-it-works__phone'>
              <img
                src={img1}
                alt="Create your dog's profile"
                className={`how-it-works__screen ${
                  currentStep === 0 ? "how-it-works__screen--active" : ""
                }`}
                data-screen='1'
              />
              <img
                src={img2}
                alt='Find meetups near you'
                className={`how-it-works__screen ${
                  currentStep === 1 ? "how-it-works__screen--active" : ""
                }`}
                data-screen='2'
              />
              <img
                src={img3}
                alt='Socialize, play, connect'
                className={`how-it-works__screen ${
                  currentStep === 2 ? "how-it-works__screen--active" : ""
                }`}
                data-screen='3'
              />
            </div>
          </div>

          <div className='how-it-works__content'>
            <div
              className={`how-it-works__step ${
                currentStep === 0 ? "how-it-works__step--active" : ""
              }`}
              data-step='1'
            >
              <div className='how-it-works__number'>1</div>
              <h3 className='how-it-works__step-title'>
                Create your dog's profile
              </h3>
              <p className='how-it-works__step-subtitle'>
                Customize it with breed, size, gender, description, picture...
              </p>
            </div>

            <div
              className={`how-it-works__step ${
                currentStep === 1 ? "how-it-works__step--active" : ""
              }`}
              data-step='2'
            >
              <div className='how-it-works__number'>2</div>
              <h3 className='how-it-works__step-title'>
                Find meetups near you
              </h3>
              <p className='how-it-works__step-subtitle'>
                Filter by location, type of activity, date...
              </p>
            </div>

            <div
              className={`how-it-works__step ${
                currentStep === 2 ? "how-it-works__step--active" : ""
              }`}
              data-step='3'
            >
              <div className='how-it-works__number'>3</div>
              <h3 className='how-it-works__step-title'>
                Socialize, play, connect
              </h3>
              <p className='how-it-works__step-subtitle'>
                Meet other dog owners and build a happy social routine for your
                pup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='key-features'>
        <h2 className='key-features__title'>Key features</h2>

        <div className='key-features__container'>
          <div
            className='key-features__card key-features__card--small'
            data-tilt
          >
            <img
              src={magnify}
              alt='Magnify'
              className='key-features__icon key-features__icon--magnify'
            />
            <div className='key-features__content'>
              <h3 className='key-features__card-title'>Smart filters</h3>
              <p className='key-features__card-subtitle'>
                Easily find events that match your dog's personality and needs.
              </p>
            </div>
          </div>

          <div className='key-features__card key-features__card--large'>
            <img
              src={keyFeaturesMockup}
              alt='Phone Mockup'
              className='key-features__mockup'
              id='phone-mockup'
            />
          </div>

          <div
            className='key-features__card key-features__card--small'
            data-tilt
          >
            <img
              src={tennisBall}
              alt='Tennis Ball'
              className='key-features__icon key-features__icon--tennis'
            />
            <div className='key-features__content'>
              <h3 className='key-features__card-title'>
                Activities they'll love
              </h3>
              <p className='key-features__card-subtitle'>
                From playdates to chill park walks, discover events that suit
                your dog's mood and preferences.
              </p>
            </div>
          </div>

          <div
            className='key-features__card key-features__card--small'
            data-tilt
          >
            <img
              src={contentSave}
              alt='Save'
              className='key-features__icon key-features__icon--save'
            />
            <div className='key-features__content'>
              <h3 className='key-features__card-title'>Save your favorites</h3>
              <p className='key-features__card-subtitle'>
                Never miss a great plan. Save events you love and view them
                anytime.
              </p>
            </div>
          </div>

          <div
            className='key-features__card key-features__card--small'
            data-tilt
          >
            <img
              src={dog}
              alt='Dog'
              className='key-features__icon key-features__icon--dog'
            />
            <div className='key-features__content'>
              <h3 className='key-features__card-title'>
                Calm & friendly space
              </h3>
              <p className='key-features__card-subtitle'>
                Our community is designed to create stress-free, positive
                experiences for every pup.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='opinion-section'>
        <h2 className='opinion-section__title'>What dog owners are saying</h2>

        <div className='opinion-section__container'>
          <div className='opinion-card opinion-card--rotate-1'>
            <p className='opinion-card__text'>
              Finding local events that suit my dog's energy level has made our
              walks way more exciting!
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img src={Liam} alt='Liam' className='opinion-card__image' />
              </div>
              <span className='opinion-card__name'>Liam</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-2'>
            <p className='opinion-card__text'>
              My shy pup finally made friends. The vibe is so welcoming and
              calm.
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img
                  src={Oliver}
                  alt='Oliver'
                  className='opinion-card__image'
                />
              </div>
              <span className='opinion-card__name'>Oliver</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-3'>
            <p className='opinion-card__text'>
              The best part is how easy it is to join or create an event.
              Amazing website!
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img src={Owen} alt='Owen' className='opinion-card__image' />
              </div>
              <span className='opinion-card__name'>Owen</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-4'>
            <p className='opinion-card__text'>
              I love how easy it is to filter by breed and activity. It saves me
              so much time.
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img src={Ethan} alt='Ethan' className='opinion-card__image' />
              </div>
              <span className='opinion-card__name'>Ethan</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-5'>
            <p className='opinion-card__text'>
              My dog has become so much more social since we started using this
              app!
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img
                  src={Jordan}
                  alt='Jordan'
                  className='opinion-card__image'
                />
              </div>
              <span className='opinion-card__name'>Jordan</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-6'>
            <p className='opinion-card__text'>
              The community here is so supportive and friendly. We've made great
              friends!
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img
                  src={Samantha}
                  alt='Samantha'
                  className='opinion-card__image'
                />
              </div>
              <span className='opinion-card__name'>Samantha</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-7'>
            <p className='opinion-card__text'>
              I've noticed such a positive change in my dog's behavior since we
              started socializing more.
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img
                  src={Olivia}
                  alt='Olivia'
                  className='opinion-card__image'
                />
              </div>
              <span className='opinion-card__name'>Olivia</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-8'>
            <p className='opinion-card__text'>
              The variety of events available is amazing. There's something for
              every dog!
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img src={Emma} alt='Emma' className='opinion-card__image' />
              </div>
              <span className='opinion-card__name'>Emma</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-9'>
            <p className='opinion-card__text'>
              This app has completely transformed our daily routine. We look
              forward to our walks now!
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img
                  src={Charlotte}
                  alt='Charlotte'
                  className='opinion-card__image'
                />
              </div>
              <span className='opinion-card__name'>Charlotte</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-10'>
            <p className='opinion-card__text'>
              The location-based search feature is so convenient. We've
              discovered so many new places!
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img src={Emily} alt='Emily' className='opinion-card__image' />
              </div>
              <span className='opinion-card__name'>Emily</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-11'>
            <p className='opinion-card__text'>
              I love how the app matches dogs by temperament—meetups are way
              more fun.
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img src={Riley} alt='Riley' className='opinion-card__image' />
              </div>
              <span className='opinion-card__name'>Riley</span>
            </div>
          </div>

          <div className='opinion-card opinion-card--rotate-12'>
            <p className='opinion-card__text'>
              As a new dog owner, this community has been invaluable for
              learning and support.
            </p>
            <div className='opinion-card__profile'>
              <div className='opinion-card__image-container'>
                <img src={Ava} alt='Ava' className='opinion-card__image' />
              </div>
              <span className='opinion-card__name'>Ava</span>
            </div>
          </div>
        </div>
      </section>

      <section className='social-life'>
        <div className='social-life__container'>
          <div className='social-life__mockup'>
            <img
              src={socialMockup}
              alt='Social Life Mobile App'
              className='social-life__mockup-img'
            />
          </div>

          <div className='social-life__content'>
            <h2 className='social-life__title'>
              Give your dog the social life they deserve
            </h2>
            <p className='social-life__subtitle'>
              No dowloads. No preassure. Just happy tails.
            </p>
            <button className='social-life__button'>Try it for free</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
