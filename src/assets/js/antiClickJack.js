if (self === top) {
    const antiClickjack = document.getElementById('antiClickjack');
    antiClickjack.parentNode.removeChild(antiClickjack);
} else {
    top.location = self.location;
}
