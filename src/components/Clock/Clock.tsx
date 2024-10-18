import React from 'react';

interface Props {
  name: string;
  today: Date;
}

export class Clock extends React.Component<Props> {
  componentDidUpdate(prevProps: Readonly<Props>) {
    const dateChanged = prevProps.today !== this.props.today;
    const nameChanged = prevProps.name !== this.props.name;

    if (dateChanged) {
      // eslint-disable-next-line no-console
      console.log(this.props.today.toUTCString().slice(-12, -4));
    }

    if (nameChanged) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevProps.name} to ${this.props.name}`);
    }
  }

  render() {
    const { name, today } = this.props;

    return (
      <div className="Clock">
        <strong className="Clock__name">{name}</strong>

        {' time is '}

        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
