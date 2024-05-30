import React from 'react';

export default function Alerts(props) {
  return (
    <div className="myalert" style={{ height: '60px' }}>
      {props.alertmode && (
        <div
          className={`alert alert-${props.alertmode.type ? props.alertmode.type : 'danger'} alert-dismissible fade show`}
          role="alert"
        >
          <strong>Hello Mr.</strong> {props.alertmode.msg || 'Nothing here'}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
}
