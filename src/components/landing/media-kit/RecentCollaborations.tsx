export const RecentCollaborations = () => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Recent Collaborations</h4>
      <div className="flex gap-4">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          alt="Collaboration 1"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="Collaboration 2"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
          alt="Collaboration 3"
          className="w-20 h-20 rounded-lg object-cover"
        />
      </div>
    </div>
  );
};