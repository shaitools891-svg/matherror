// GradientText.jsx
const GradientText = ({ 
  text, 
  className = "",
  colors = "from-blue-600 via-green-500 to-indigo-400"
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
    >
      {text}
    </span>
  );
};

export default GradientText;
