import React from 'react';
import DatePicker from '../../lib/DatePicker';
import DateRange from '../../lib/DateRange';

const isWeekday = (date) => {
  const day = date.day();
  return day !== 0 && day !== 6;
};

it('should render a default date input and date picker', () => {
  const datePicker = <DatePicker utcOffset={0} />;
  const wrapper = shallow(datePicker);
  expect(wrapper).toMatchSnapshot();
});

it('should render a date range', () => {
  const dateRange = <DateRange utcOffset={0} />;
  const wrapper = shallow(dateRange);
  expect(wrapper).toMatchSnapshot();
});

it('should render a date picker with disabled dates', () => {
  const datePicker = (<DatePicker
    excludeDates={['04-01-2017T00:00:00.000Z', '04-03-2017T00:00:00.000Z']}
    utcOffset={0}
  />);
  const wrapper = shallow(datePicker);
  expect(wrapper).toMatchSnapshot();
});

it('should render a date picker with filtered dates', () => {
  const datePicker = <DatePicker filterDate={isWeekday} utcOffset={0} />;
  const wrapper = shallow(datePicker);
  expect(wrapper).toMatchSnapshot();
});

it('should render a date picker with included dates', () => {
  const datePicker = (<DatePicker
    includeDates={['04-01-2017T00:00:00.000Z', '04-02-2017T00:00:00.000Z', '04-03-2017T00:00:00.000Z']}
    utcOffset={0}
  />);
  const wrapper = shallow(datePicker);
  expect(wrapper).toMatchSnapshot();
});

it('should render a date picker with min and max dates', () => {
  const datePicker = (<DatePicker
    minDate={'04-01-20171T00:00:00.000Z'}
    maxDate={'04-10-2017T00:00:00.000Z'}
    utcOffset={0}
  />);
  const wrapper = shallow(datePicker);
  expect(wrapper).toMatchSnapshot();
});
