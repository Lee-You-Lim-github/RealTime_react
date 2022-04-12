function Reviewradio({ name, handleFieldChange }) {
  return (
    <div onChange={handleFieldChange} className="mt-6 mb-16 ml-36">
      <input
        type="radio"
        name={name}
        value="매우좋아요"
        className="mx-1 h-4 w-4"
      />
      <span className="mr-10 text-lg"> 🥰 매우좋아요</span>
      <input type="radio" name={name} value="좋아요" className="mx-1 h-4 w-4" />
      <span className="mr-10 text-lg"> 😃좋아요</span>
      <input
        type="radio"
        name={name}
        value="보통이에요"
        className="mx-1 h-4 w-4"
      />
      <span className="mr-10 text-lg"> 😶보통이에요</span>
      <input
        type="radio"
        name={name}
        value="별로예요"
        className="mx-1 h-4 w-4"
      />
      <span className="mr-10 text-lg"> 😕별로예요</span>
      <input type="radio" name={name} value="싫어요" className="mx-1 h-4 w-4" />
      <span className="mr-10 text-lg">😣싫어요</span>
    </div>
  );
}

export default Reviewradio;
