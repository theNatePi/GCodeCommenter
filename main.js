

function main() {
    let input_code = prompt('Input code here: ');

    let all_lines = input_code.split("\n");
    let len_all_lines = all_lines.length;

    let total_line = "";
    let i = 0;

    for (; i < len_all_lines; ) {
        // Remove the current line number
        let current_line_split = all_lines[i];
        // Split the code into its parts
        let current_line_components = current_line_split.split(" ");
        if (current_line_components[0].length >= 2) {
            if (current_line_components[0].startsWith("N")) {
                // Remove code line
                current_line_split = current_line_split.slice(current_line_components[0].length + 1);
            }
        }
        // Add new code line
        current_line_split = "N" + i + " " + current_line_split;
        current_line_split += " ;";
        if (current_line_split.includes("G90")) {
            current_line_split += " Absolute coordinates";
        }
        if (current_line_split.includes("G00") || current_line_split.includes("G0")) {
            current_line_split += " Rapid traverse";
        }
        if (current_line_split.includes("G20")) {
            current_line_split += " in Inches";
        }

        if (current_line_split.includes("G91")) {
            current_line_split += " Incremental coordinates";
        }

        if (current_line_split.includes("G21")) {
            current_line_split += " in Millimeters";
        }

        if (current_line_split.includes("S")) {
            // If the comment labels a slot
            if (!current_line_split.includes("Slot")) {
                if (!current_line_split.includes("Spindle")) {
                    let split_for_s = current_line_split.split("S");
                    let spindle_speed_number = split_for_s[1].split(" ");
                    let the_speed = spindle_speed_number[0];
                    current_line_split += " Spindle speed " + the_speed;
                }
            }
        }


        if (current_line_split.includes("M02") || current_line_split.includes("M2")) {
            if (!current_line_split.includes("M20")) {
                current_line_split += " End program";
            }
        }
        if (current_line_split.includes("M03") || current_line_split.includes("M3")) {
            if (!current_line_split.includes("M30")) {
                current_line_split += " Spindle on";
            }
        }
        if (current_line_split.includes("M05") || current_line_split.includes("M5")) {
            if (!current_line_split.includes("M50")) {
                current_line_split += " Spindle off";
            }
        }
        if (current_line_split.includes("M06") || current_line_split.includes("M6")) {
            if (!current_line_split.includes("M60")) {
                current_line_split += " Tool change";
            }
        }
        if (current_line_split.includes("T")) {
            let split_for_t = current_line_split.split("T");
            let selected_tool_number = split_for_t[1].split(" ");
            let tool = selected_tool_number[0];
            current_line_split += " Tool " + tool;
        }



        if (current_line_split.endsWith(";")) {
            current_line_split = current_line_split.slice(0, -1);
        }

        console.log(current_line_split);

        total_line += "<br>" + current_line_split;

        i ++;
    }

    let iup = i + 1;


    total_line = total_line.replace("M30", "M05 ; Turn off Spindle    <br>N" + i + " G01 X4 Y3 Z1 ; Safe space <br>N" + iup + " M02 ; End program ");

    document.getElementById("OutputP").innerHTML = "";
    document.getElementById("OutputP").innerHTML += total_line;
}



document.getElementById("PInputButton").addEventListener("click", main);

