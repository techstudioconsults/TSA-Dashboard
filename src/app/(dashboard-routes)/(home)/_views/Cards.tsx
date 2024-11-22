const Cards = () => {
  return (
    <div>
      <section className="grid grid-cols-3 justify-between gap-5 py-8">
        <div className="flex gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Course</h6>
            <h3>900</h3>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div></div>
        </div>
        <div className="flex gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Class</h6>
            <h3>70282</h3>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div></div>
        </div>
        <div className="flex gap-3 rounded-lg bg-white p-5 shadow">
          <div className="flex flex-col gap-3">
            <h6>Total Course</h6>
            <h3>2782</h3>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default Cards;
