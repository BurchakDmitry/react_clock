import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

interface State {
  today: string;
  hasClock: boolean;
  clockName: string;
}

export class App extends React.Component {
  state: Readonly<State> = {
    today: new Date().toUTCString().slice(-12, -4),
    hasClock: true,
    clockName: 'Clock-0',
  };

  handleMouseClick = (event: MouseEvent) => {
    event.preventDefault();
    const { hasClock } = this.state;

    if (event.type === 'contextmenu' && hasClock) {
      this.setState({ hasClock: false });

      return null;
    }

    if (event.type === 'click' && !hasClock) {
      this.setState({ hasClock: true });
    }
  };

  getRandomName(): string {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  }

  timerId() {
    return window.setInterval(() => {
      this.setState({ clockName: this.getRandomName() });
    }, 3300);
  }

  currentDate() {
    return window.setInterval(() => {
      this.setState({ today: new Date() });
    }, 1000);
  }

  componentDidMount() {
    this.timerId();
    this.currentDate();
    window.addEventListener('click', this.handleMouseClick);
    window.addEventListener('contextmenu', this.handleMouseClick);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId());
    window.clearInterval(this.currentDate());
    window.removeEventListener('click', this.handleMouseClick);
    window.removeEventListener('contextmenu', this.handleMouseClick);
  }

  render() {
    const { today, hasClock, clockName } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>
        {hasClock && <Clock name={clockName} today={today} />}
      </div>
    );
  }
}
