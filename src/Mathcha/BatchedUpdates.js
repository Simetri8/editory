import ReactDOM from 'react-dom';

/// xxx(96) /*BatchedUpdates*/

/// var r = n(16)/*ReactDOM*/;  // 1 times
/// var a = n.n(r);
var BatchedUpdates = new class { in (e) {
        return ReactDOM.unstable_batchedUpdates(e)
    }
}

export default BatchedUpdates