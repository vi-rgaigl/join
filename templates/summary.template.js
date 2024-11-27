function getTemplateSummary(tasks) {
  return `<div class="summary-data-left">
              <div class="summary-data-row">
                <a class="summary-data-card card-m" href="./board.html">
                  <div class="data-card-img">
                    <img src="./assets/icons/edit.svg" alt="icon_todo" />
                  </div>
                  <div class="card-number">
                    1
                    <div class="card-number-name">To-Do</div>
                  </div>
                </a>
                <a class="summary-data-card card-m" href="./board.html">
                  <div class="data-card-img">
                    <img
                      class="data-card-img-check"
                      src="./assets/icons/checkWithoutCircle.svg"
                      alt="icon_done"
                    />
                  </div>
                  <div class="card-number">
                    1
                    <div class="card-number-name">Done</div>
                  </div>
                </a>
              </div>
              <div class="summary-data-row">
                <a class="summary-data-card card-l" href="./board.html">
                  <div class="card-prio card-prio-urgent"></div>
                  <div class="card-number">
                    1
                    <div class="card-number-name">Urgent</div>
                  </div>
                  <div class="card-seperator"></div>
                  <div class="card-date">
                    October 16, 2022
                    <div class="card-date-name">Upcoming Deadline</div>
                  </div>
                </a>
              </div>
              <div class="summary-data-row">
                <a class="summary-data-card card-s" href="./board.html">
                  <div class="card-number">
                    5
                    <div class="card-number-name">Task in Board</div>
                  </div>
                </a>
                <a class="summary-data-card card-s" href="./board.html">
                  <div class="card-number">
                    2
                    <div class="card-number-name">Task in Progess</div>
                  </div>
                </a>
                <a class="summary-data-card card-s" href="./board.html">
                  <div class="card-number">
                    3
                    <div class="card-number-name">Awaiting Feedback</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="summary-data-rigth">
              <div class="summary-data-text">Good morning,</div>
              <div class="summary-data-name">Sofia Müller</div>
            </div>`;
}
