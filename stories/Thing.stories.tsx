import { Meta } from '@storybook/react';
import React from 'react';
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

const meta: Meta = {
  title: 'App',
  component: App,
};

export default meta;

const Template = () => <App />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
