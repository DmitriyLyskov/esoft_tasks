def is_correct(st):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    
    for char in st:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack.pop() != pairs[char]:
                return False
    
    return len(stack) == 0

print(is_correct("()"))     
print(is_correct("()[]{}"))
print(is_correct("(]"))     
print(is_correct("([)]"))    
print(is_correct("{[]}"))    
print(is_correct(""))
