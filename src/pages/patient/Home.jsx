import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="home_container">
        <div className="parent_container">
          <div className="left_container">
            <div className="left_child1">
              <img
                className="autism-img-1"
                src={"images/img-autism1.png"}
                alt=""
              />
            </div>
            <div className="left_child2">
              <img
                className="autism-img-2"
                src={"images/img-autism2.png"}
                alt=""
              />
              <img
                className="autism-img-3"
                src={"images/img-autism3.png"}
                alt=""
              />
            </div>
          </div>

          <div className="right_container">
            <div className="content-slider">
              <div className="slider">
                <div className="mask">
                  <ul>
                    <li className="anim1">
                      <div className="quote">
                        <p>
                          “It’s really cool that everybody’s a little bit
                          different, but the same, too.”
                          <br />
                          <br /> <span>— Julia from Sesame Street</span>
                        </p>
                      </div>
                    </li>
                    <li className="anim2">
                      <div className="quote">
                        “Autism is like a rainbow. It has a bright side and a
                        darker side. But every shade is important and
                        beautiful.”
                        <br />
                        <br /> <span>— Rosie Tennant Doran</span>
                      </div>
                    </li>
                    <li className="anim3">
                      <div className="quote">
                        “It does not matter what sixty-six percent of people do
                        in any particular situation. All that matters is what
                        you do.”
                        <br />
                        <br /> <span>—John Elder Robiso</span>
                      </div>
                    </li>
                    <li className="anim4">
                      <div className="quote">
                        “Autism is like a rainbow. It has a bright side and a
                        darker side. But every shade is important and
                        beautiful.”
                        <br />
                        <br /> <span>— Rosie Tennant Doran</span>
                      </div>
                    </li>
                    <li className="anim5">
                      <div className="quote">
                        “Autism is like a rainbow. It has a bright side and a
                        darker side. But every shade is important and
                        beautiful.”
                        <br /> <br />
                        <span>— Rosie Tennant Doran</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card_container max-h-max py-6">
        <div className="test_card">
          Take our 5 minutes autism test to check whether your child is autistic
          or not!
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn  mx-2 btn-outline-info"
            type="submit"
            onClick={() => navigate("/doctor")}
          >
            Take Test
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
