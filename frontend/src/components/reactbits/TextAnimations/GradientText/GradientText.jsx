const GradientText = ({ 
  text, 
  className = ""
}) => {
  return (
    <span
      className={`
        inline-block
        font-extrabold
        text-transparent
        animate-gradient-x
        ${className}
      `}
      style={{
        background: 'linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)',
        backgroundSize: '400% 400%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradient-x 3s ease infinite'
      }}
    >
      {text}
    </span>
  );
};

export default GradientText;
