const IndividualSuggestion = ({ name, avatar }) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center space-x-2">
        <div className="rounded__imageContainer h-[2rem] w-[2rem]">
          <img alt="image" src={avatar} className="rounded__image" />
        </div>
        <div>
          <h2 className="text-sm font-medium cursor-pointer hover:underline">
            {name}
          </h2>
          <p className="text-xs text-gray-400">Suggested for you</p>
        </div>
      </div>
      <p className="text-xs text-blue-400 cursor-pointer font-medium">Follow</p>
    </div>
  );
};

export default IndividualSuggestion;
