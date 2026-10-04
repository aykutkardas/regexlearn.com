import IntlLink from 'src/components/IntlLink';

const Logo = () => (
  <IntlLink href="/[lang]" className="group inline-flex items-center rounded-lg" aria-label="RegexLearn">
    <span
      dir="ltr"
      className="inline-flex flex-col leading-none font-sans font-bold text-[17px] sm:text-[19px] tracking-[-0.02em] text-white"
    >
      <span>
        Regex<span className="text-regreen-400">Learn</span>
      </span>
      <span className="self-end mt-[3px] h-[2px] sm:h-[3px] w-[46%] rounded-full bg-regreen-400 transition-all duration-300 group-hover:w-full" />
    </span>
  </IntlLink>
);

export default Logo;
