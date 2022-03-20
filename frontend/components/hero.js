import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <h1>Hi, This is BoilerPlate Application for Next js react used by MediaMonks India</h1>
      <p>
        Please use this as a starter package for all the projects
      </p>
    </section>
  );
}

export default Hero;
