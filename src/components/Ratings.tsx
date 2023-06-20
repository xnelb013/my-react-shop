interface RatingProps {
  readonly checkedIndex: number;
}

const Ratings = ({ checkedIndex }: RatingProps) => {
  return (
    <>
      <input type="radio" name="rating-10" className="rating-hidden" />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        defaultChecked={checkedIndex === 1}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        defaultChecked={checkedIndex === 2}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        defaultChecked={checkedIndex === 3}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        defaultChecked={checkedIndex === 4}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        defaultChecked={checkedIndex === 5}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        defaultChecked={checkedIndex === 6}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        defaultChecked={checkedIndex === 7}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2"
        defaultChecked={checkedIndex === 8}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-1"
        defaultChecked={checkedIndex === 9}
      />
      <input
        type="radio"
        name="rating-10"
        className="bg-orange-400 mask mask-star-2 mask-half-2 mr-2"
        defaultChecked={checkedIndex === 10}
      />
    </>
  );
};

export default Ratings;
