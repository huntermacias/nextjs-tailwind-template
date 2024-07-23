
interface CardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="w-auto sm:w-[30rem] h-full bg-black p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        {description && <p className="text-gray-400 text-mds">{description}</p>}
      </div>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

interface CardSectionProps {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardSectionProps> = ({ children }) => {
  return <div className="mb-4 pb-2">{children}</div>;
};

export const CardContent: React.FC<CardSectionProps> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const CardFooter: React.FC<CardSectionProps> = ({ children }) => {
  return <div className="pt-4">{children}</div>;
};

export default Card;
