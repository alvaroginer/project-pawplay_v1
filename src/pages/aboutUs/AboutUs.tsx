import "./AboutUs.css";
import groupOfDogs from "../../imgs/aboutUs/group-of-dogs.png";
import bita from "../../imgs/aboutUs/bita.png";
import joan from "../../imgs/aboutUs/joan.png";
import alvaro from "../../imgs/aboutUs/alvaro.png";
import { Button } from "../../components/button/Button";

export const AboutUs = () => {
  return (
    <div className="about-us__container">
      <div className="hero-section">
        <div className="about-tag">
          <span className="dot"></span>
          <span className="label-text">About us</span>
        </div>

        <div className="main-title-container">
          <h1 className="main-title">
            We fetch friendships by bringing pups and people together for
            tail-wagging adventures
          </h1>
        </div>
      </div>

      <div className="main-image-container">
        <img src={groupOfDogs} alt="Dogs on leashes" className="main-image" />
      </div>

      <div className="pawpose-section">
        <div className="pawpose-tag">
          <span className="dot"></span>
          <span className="label-text">Our pawpose</span>
        </div>

        <div className="info-items">
          <div className="info-item">
            <h3 className="info-title">Unleashing connections</h3>
            <p className="info-text">
              We make it easy fot pups and their humans to meet, play, and build
              lifelong friendships.
            </p>
            <div className="separator"></div>
          </div>

          <div className="info-item">
            <h3 className="info-title">Move waggily, love wildly</h3>
            <p className="info-text">
              No more lonely walks! We connect dog lovers for tail-wagging
              meetups anytime, anywhere.
            </p>
            <div className="separator"></div>
          </div>

          <div className="info-item">
            <h3 className="info-title">Meet, greet, stay</h3>
            <p className="info-text">
              Because life's better when shared-especially with paws, barks, and
              happy xoomies.
            </p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="team-container">
          <div className="team-tag">
            <span className="dot"></span>
            <span className="label-text label-text--white">Our team</span>
          </div>
          <div className="team-members">
            <div className="team-member">
              <img src={bita} alt="Team member" className="team-img" />
            </div>
            <div className="team-member">
              <img src={joan} alt="Team member" className="team-img" />
            </div>
            <div className="team-member">
              <img src={alvaro} alt="Team member" className="team-img" />
            </div>
          </div>
        </div>
      </div>

      <div className="pawcode-section">
        <div className="pawcode-tag">
          <span className="dot"></span>
          <span className="label-text">The paw code</span>
        </div>

        <div className="code-items">
          <div className="code-item">
            <h3 className="code-title">Paw first</h3>
            <p className="code-text">
              Happy pups, happy people. That's our priority.
            </p>
            <div className="separator"></div>
          </div>

          <div className="code-item">
            <h3 className="code-title">Play together</h3>
            <p className="code-text">
              Friendships are better with wagging tails.
            </p>
            <div className="separator"></div>
          </div>

          <div className="code-item">
            <h3 className="code-title">Stay pawsitive</h3>
            <p className="code-text">
              We believe in good wibes and good doggos.
            </p>
            <div className="separator"></div>
          </div>

          <div className="code-item">
            <h3 className="code-title">Unleash joy</h3>
            <p className="code-text">
              Every meetup is a chance for zoomies and fun.
            </p>
            <div className="separator"></div>
          </div>

          <div className="code-item">
            <h3 className="code-title">Fetch pawsibility</h3>
            <p className="code-text">
              Building a world where all dogs (and humasn) belong.
            </p>
          </div>
        </div>
      </div>

      <div className="message-container">
        <p className="message-text">
          Three humans, one big idea, and countless wagging tails! As dog
          lovers, we knew playdates aren't just for kids—pups need them too! So
          we created Paw Play, a place where furry friends (and their humans)
          can meet, run, and have a pawsome time. Because, let's be honest...
          life is better with barks, zoomies, and new packmates!
        </p>
      </div>

      <div className="contact-section">
        <div className="contact-text-container">
          <div className="text-wrapper">
            <p className="contact-title">
              Want to know more about us or the project?
            </p>
            <p className="contact-title">Get in touch!</p>
          </div>

          <Button className="" children="Contact us" />
        </div>
      </div>
    </div>
  );
};
