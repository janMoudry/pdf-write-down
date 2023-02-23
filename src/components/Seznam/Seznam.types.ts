export type SeznamData = Array<{ text: string; id: number }>;

interface SeznamProps {
  data: SeznamData;
  title: string;
  onSelect: Function;
  selected: number;
}

export default SeznamProps;
