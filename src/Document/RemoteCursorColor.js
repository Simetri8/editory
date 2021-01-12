
/// xxx(256) /*RemoteCursorColor*/

var RemoteCursorColor = new class {
    generate(e) {
        switch (e % 7) {
        case 0:
            return "#0d47a1";
        case 1:
            return "#1b5e20";
        case 2:
            return "#bf360c";
        case 3:
            return "#880e4f";
        case 4:
            return "#01579b";
        case 5:
            return "#33691e"
        }
        return "#3e2723"
    }
}

export default RemoteCursorColor