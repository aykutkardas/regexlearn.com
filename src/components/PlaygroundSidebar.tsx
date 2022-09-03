import { useIntl } from 'react-intl';

import CheatsheetCollapse from 'src/components/CheatsheetCollapse';

import data from 'src/data/cheatsheet.json';

const PlaygroundSidebar = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="overflow-y-hidden hover:overflow-y-scroll rounded-md h-[500px]">
      {data.map(row => (
        <div key={row.title} className="bg-neutral-800/60 p-3 mb-3 rounded-md">
          <div className="mb-3">{formatMessage({ id: row.title })}</div>
          {row.data.map(item => (
            <CheatsheetCollapse
              key={item.title}
              title={formatMessage({ id: item.title })}
              data={item}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlaygroundSidebar;
