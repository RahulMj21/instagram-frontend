const SingleStatus = ({ avatar, name }) => {
  return (
    <div className="status__item cursor-pointer">
      <div className="border__red">
        <div className="rounded__imageContainer h-14 w-14">
          <img className="rounded__image" src={avatar} alt={name} />
        </div>
      </div>
      <p className="text-xs text-gray-400">{name}</p>
    </div>
  );
};

export default SingleStatus;
