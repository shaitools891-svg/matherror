const GradientText = ({ 
  text, 
  className = "",
  colors = "from-blue-600 via-purple-600 to-pink-600"
}) => {
  return (
    <span
      className={`
        inline-block
        text-transparent 
        bg-clip-text 
        bg-gradient-to-r 
        ${colors}
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
