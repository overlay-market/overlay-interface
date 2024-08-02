export function getRandomColors() {
  const colorSets = [
    ['#EDB7D1', '#FCA3B9', '#F6E8FF', '#FDE1B2', '#ECC8A8'],
    ['#edb2fb', 'fcf6bd', '#ccdbfd', '#a1defe', '#abc4ff'],
    ['#e8ddf5', '#fce1e4', '#aca4dd', '#ddedea', '#daeaf6'],
    ['#d3ab9e', '#dac9a1', '#ebd8d0', '#dffbaa', '#feda7c'],
    ['#f08080', '#da978e', '#d8ad9d', '#fbc4ab', '#ffdab9'],
    ['#a7bed3', '#c6e2e9', '#f1ffc4', '#ffcaaf', '#dab894'],
    ['#edede9', '#d6a4c2', '#f5ebe0', '#e3d5ca', '#d5bdaf'],
    ['#ccd5ae', '#c9edc9', '#fefae0', '#faedcd', '#d4a373'],
  ]
  return colorSets[Math.floor(Math.random() * colorSets.length)]
}

export function getRandomName() {
  const names = [
    'Mary Baker',
    'Maya Angelou',
    'Mary Edwards',
    'Carrie Chapman',
    'Elizabeth Cady',
    'Felisa Rincon',
    'Wilma Rudolph',
    'Betty Ford',
    'Grace Hopper',
    'Chien-Shiung',
    'Queen Lili',
    'Nellie Bly',
  ]
  return names[Math.floor(Math.random() * names.length)]
}
