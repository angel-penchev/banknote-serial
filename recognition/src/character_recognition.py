def overlap(r1, r2):
    if r1[0] >= r2[0] + r2[2] or r1[0] + r2[2] <= r2[0]:
        return False

    if r1[1] >= r2[1] + r2[3] or r1[1] + r1[3] <= r2[1]:
        return False

    return True
