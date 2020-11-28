export const guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, (c, r) => ('x' === c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)).toString(16));
};