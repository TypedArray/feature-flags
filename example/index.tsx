import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import {
  DevelopOptions,
  useFeatureFlag,
  useToggleDevelopOptions,
} from '../src';

function Feature1() {
  const featureFlag1 = useFeatureFlag('featureFlag1');
  return (
    <button disabled={!featureFlag1}>
      Feature1 is {featureFlag1 ? 'enabled' : 'disabled'}
    </button>
  );
}
function Feature2() {
  const featureFlag2 = useFeatureFlag('featureFlag2');
  return (
    <button disabled={!featureFlag2}>
      Feature2 is {featureFlag2 ? 'enabled' : 'disabled'}
    </button>
  );
}
function App() {
  const toggle = useToggleDevelopOptions();
  return (
    <>
      <Feature1 />
      <br />
      <Feature2 />
      <hr />
      <button
        onClick={(event) => {
          // 连击五次弹出功能开关选项
          if (event.detail === 5) {
            toggle();
          }
        }}
      >
        连击五次切换功能开关
      </button>
      <hr />
      <DevelopOptions
        featureFlags={{
          featureFlag1: false,
          featureFlag2: true,
        }}
      />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
