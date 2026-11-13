import React from 'react';
import { motion } from 'framer-motion';
interface AranLogoProps {
  className?: string;
}

const AranLogo: React.FC<AranLogoProps> = ({ className }) => {
  return (
    <motion.img
      src="/branding/aran-logo.svg"
      alt="ARAN Logo"
      className={className}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
};

export default AranLogo;
