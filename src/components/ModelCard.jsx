import React from 'react'
import "./css/style.css"
import "./css/style.min.css"
const ModelCard = (props) => {
    return (
      <>
        <div className="view-msg">
          <button
            type="button"
            class="btn btn-outline-info"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Reply
          </button>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Send your Reply
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div className="msg">{props.msg}</div>

                  <textarea
                    style={{
                      width: "100%",
                      outline: "none",
                      marginTop: "1rem",
                      height: "10rem",
                    }}
                    id="content"
                    name="content"
                    placeholder="write your reply here"
                    required
                  ></textarea>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-outline-info">
                    send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ModelCard
