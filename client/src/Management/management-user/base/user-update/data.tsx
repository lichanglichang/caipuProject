// 地址选择框
export const options = [
  {
    value: "chongqing",
    label: "重庆市",
    children: [
      {
        value: "yuBei",
        label: "渝北区",
      },
      {
        value: "jiuLongPo",
        label: "九龙坡",
      },
      {
        value: "shaPingBa",
        label: "沙坪坝",
      },
      {
        value: "wanZou",
        label: "万州区",
      },
    ],
  },
  {
    value: "siChuan",
    label: "四川省",
    children: [
      {
        value: "chengDu",
        label: "成都市",
        children: [
          {
            value: "qingYang",
            label: "青羊区",
          },
          {
            value: "gaoXin",
            label: "高新区",
          },
          {
            value: "piDu",
            label: "郫都区",
          },
        ],
      },
      {
        value: "luZou",
        label: "泸州市",
      },
      {
        value: "mianYang",
        label: "绵阳市",
      },
      {
        value: "guangAn",
        label: "广安市",
      },
    ],
  },
];

// 口味下拉数据
export const tasteOption = [
  { value: "sour", label: "酸" },
  { value: "sweet", label: "甜" },
  { value: "bitter", label: "苦" },
  { value: "hot", label: "辣" },
  { value: "sourAndHot", label: "酸辣" },
  { value: "numb", label: "麻" },
];
