// Create this file: src/components/reactbits/TextAnimations/GradientText/GradientText.jsx
const GradientText = ({ 
  text, 
  className = "",
  colors = "from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
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
