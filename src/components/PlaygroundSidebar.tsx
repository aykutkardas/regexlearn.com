import { useIntl } from 'react-intl';

import CheatsheetCollapse from 'src/components/CheatsheetCollapse';

import data from 'src/data/cheatsheet.json';

const PlaygroundSidebar = () => {
  const { formatMessage } = useIntl();

  return (
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-5">
      {data.map(row => (
        <section key={row.title}>
          <h2 className="px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            {formatMessage({ id: row.title })}
          </h2>
          <div className="flex flex-col gap-0.5">
            {row.data.map(item => (
              <CheatsheetCollapse
                key={item.title}
                title={formatMessage({ id: item.title })}
                data={item}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PlaygroundSidebar;
