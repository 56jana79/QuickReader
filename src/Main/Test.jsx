import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { Data } from '../Ulist/Data';
import './Test.css';

const Test = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [viewstate, setviewstate] = useState(false);
  const [isqchecked, setqstate] = useState(false);
  const [isownerchecked, setownerchecked] = useState(false);
  const [istypechecked, settypechecked] = useState(false);
  const [ismarkchecked, setmarkchecked] = useState(false);
  const [isactionchecked, setactionchecked] = useState(false);
  const [selectall, setselectall] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const viewbutton = () => {
    setviewstate(!viewstate);
  };

  const selectallhandle = () => {
    const newSelectAll = !selectall;
    setselectall(newSelectAll);
    const updatedItems = {};
    Data.forEach((item, index) => {
      updatedItems[index] = newSelectAll;
    });
    setCheckedItems(updatedItems);
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const inputchange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const applayfn = () => {
    setviewstate(!viewstate);
  };

  const filteredData = Data.filter((item) =>
    item.question.toLowerCase().includes(searchQuery) ||
    item.subquestion.toLowerCase().includes(searchQuery)
  );

  const dataToDisplay = showAll ? filteredData : filteredData.slice(0, 10);

  return (
    <div className="test-page">
     <div className='navcontainer' style={{ marginTop: '10px' }}>
  <Navbar className='mainnav' isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
</div>

      <div className="test-container" style={{ display: 'flex', width: '100%' }}>
        {isSidebarOpen && (
          <div className='side-part'>
            <div className='add-q-button'>
              <button>
                <h4>Add Question</h4>
              </button>
            </div>

            <div>
              <p className='snap-text'>SNAP SHOT</p>
              <p className='snap-text'>SECTION</p>
              <br />

              <div className='sections'>
                <span>
                  <i className="bi bi-plus"></i>
                  <p>New Section</p>
                </span>
                <span>
                  <i className="bi bi-circle-fill" style={{ color: 'red' }}></i>
                  <Link to='/section1'>
                    <p>Section1</p>
                  </Link>
                </span>
                <span>
                  <i className="bi bi-circle-fill" style={{ color: 'blue' }}></i>
                  <Link to="/section2">
                    <p>Section2</p>
                  </Link>
                </span>
                <span>
                  <Link to='/un'>
                    <p>Uncategorized (5)</p>
                  </Link>
                </span>
              </div>

              <div className='test-information'>
                <span className='test-inform'>
                  <p>TEST INFORMATION</p>
                </span>
                <div className='inner-test'>
                  <p><i className="bi bi-circle"></i>Mark : (10)</p>
                  <p><i className="bi bi-circle"></i>No.of Q : (10)</p>
                  <p><i className="bi bi-circle"></i>Neg : (10)</p>
                  <p><i className="bi bi-circle"></i>Duration : (10)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='center-part'>
          <div className='test-upper'>
            <h4>Test 1 Questions</h4>
            <div className='view-buttons'>
              <button>Full View</button>
              <button onClick={viewbutton}>View</button>
            </div>
          </div>

          {viewstate && (
            <div className='e1'>
              {[
                ['Questions', isqchecked, setqstate],
                ['Owner', isownerchecked, setownerchecked],
                ['Type', istypechecked, settypechecked],
                ['Marks', ismarkchecked, setmarkchecked],
                ['Actions', isactionchecked, setactionchecked]
              ].map(([label, state, setState], idx) => (
                <div key={idx} className='question-check'>
                  <label>
                    <input type='checkbox' checked={state} onChange={() => setState(!state)} /> {label}
                  </label>
                </div>
              ))}
              <button className='applay-button' onClick={applayfn}>Apply</button>
            </div>
          )}

          <div className='search-container'>
            <i className="bi bi-search"></i>
            <input type='text' placeholder='Search' onChange={inputchange} />
          </div>

          <div className='selectall'>
            <div className='all-q-container'>
              <label>
                <input type='checkbox' checked={selectall} onChange={selectallhandle} /> Questions
              </label>
            </div>
            <div className='para-c'>
              {isownerchecked && <p>Owner</p>}
              {istypechecked && <p>Type</p>}
              {ismarkchecked && <p>Marks</p>}
              {isactionchecked && <p>Actions</p>}
            </div>
          </div>

          <div className="questions-container">
            {dataToDisplay.map((item, index) => (
              <div key={index} className="data-main-container" onClick={() => handleToggle(index)}>
                <div className="main-question-container">
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedItems[index] || false}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </label>

                  <div className="question-answer-container">
                    {expandedId === index ? (
                      <div className='answer-question-container-main'>
                        <p className="question-text">{item.question}</p>
                        <div className="main-answer">{item.answer}</div>
                      </div>
                    ) : (
                      <p className="subquestion-text">{item.subquestion}</p>
                    )}
                  </div>

                  <div className="other-detail-container">
                    {isownerchecked && <p>{item.owner}</p>}
                    {istypechecked && <p>{item.type}</p>}
                    {ismarkchecked && <p>{item.mark}</p>}
                    {isactionchecked && (
                      <div className="action-icons">
                        {item.Action.map((iconClass, idx) => (
                          <i key={idx} className={iconClass}></i>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='load-more'>
            <button onClick={() => setShowAll(!showAll)}>
              <p>{showAll ? 'Load less' : 'Load more'}</p>
            </button>
            <div>
              <p>showing {dataToDisplay.length} out of {filteredData.length} tests</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
