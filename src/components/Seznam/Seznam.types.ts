export type SeznamData = Array<{
  text: any;
  id: number;
}>;

interface SeznamProps {
  data: SeznamData;
  title: string;
  onSelect: Function;
  selected: number;
}

export default SeznamProps;
