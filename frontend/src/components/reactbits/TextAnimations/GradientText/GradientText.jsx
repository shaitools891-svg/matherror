const GradientText = ({ 
  text, 
  className = ""
}) => {
  const gradientStyle = {
    background: 'linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #feca57, #ff9ff3, #ff6b6b)',
    backgroundSize: '400% 400%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'gradientMove 4s ease infinite'
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `
      }} />
      <span 
        className={`inline-block font-extrabold ${className}`}
        style={gradientStyle}
      >
        {text}
      </span>
    </>
  );
};

export default GradientText;
