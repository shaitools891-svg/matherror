const GradientText = ({ 
  text, 
  className = ""
}) => {
  return (
    <span
      className={`
        inline-block
        font-extrabold
        bg-gradient-to-r 
        from-pink-500 via-red-500 to-yellow-500
        dark:from-pink-400 dark:via-red-400 dark:to-yellow-400
        bg-clip-text 
        text-transparent
        animate-gradient-x
        ${className}
      `}
      style={{
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {text}
    </span>
  );
};

export default GradientText;
