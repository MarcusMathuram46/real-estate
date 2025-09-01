import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react"; // ✅ modern icon

function BackButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)} // ✅ Go back
      whileHover={{ scale: 1.08, x: -3 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full 
                 bg-gradient-to-r from-gray-100 to-gray-200 
                 text-gray-700 font-semibold shadow-lg
                 hover:shadow-xl border border-gray-300"
    >
      <ArrowLeft size={20} className="text-gray-600" />
      Back
    </motion.button>
  );
}

export default BackButton;
