const Footer = () => {
  return (
    <footer className="bg-dark-surface border-t border-dark-border py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} InviteKaro | All rights reserved
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
