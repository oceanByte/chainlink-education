#####Chapter 5:

# Loops

Loops are useful when we need to repeat a block of code a certain number of times. Solidity offers two types of loops. For Loops and While Loops.

<Highlight class="language-javascript">
    function forLoopExample() public {  
        for (uint i = 0; i < 10; i++) {  
            if (i == 3) {  
                continue;  
            }  
            if (i == 5) {  
                break;  
            }  
        }
 </Highlight>
 
 <Highlight class="language-javascript">
 function whileLoopExample() public {      
    // while loop  
        uint j;  
        while (j < 10) {  
            j++;  
        }  
    } 
 </Highlight>
