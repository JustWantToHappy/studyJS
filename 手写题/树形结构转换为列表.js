const tree = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                parentId: 1,
                children: [
                    {
                        id: 4,
                        text: "节点1_1_1",
                        parentId: 2,
                    }
                ]
            },
            {
                id: 3,
                text: "节点1_2",
                parentId:1
            }
        ]
    }
];

const ans = [];
const treeToArray = (arr) => {
    if (!Array.isArray(arr)) {
        return ;
    }
    for (let i = 0; i < arr.length; i++){
        if (arr[i].children) {
            treeToArray(arr[i].children);
        }
        delete arr[i].children;
        ans.push({ ...arr[i] });
    }
}

treeToArray(tree);
console.info(ans)