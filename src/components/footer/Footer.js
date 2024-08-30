import React from 'react';
import styles from './footer.module.css';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithubSquare } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.copyright}>
        <p>&copy; 2024 Milad Shalikarian. All rights reserved.</p>
      </div>
      <div className={styles.contact}>
        <FaGithubSquare />
        <FaLinkedin />
        <BiLogoGmail />
        <FaXTwitter />
      </div>
    </div>
  );
};

export default Footer;
