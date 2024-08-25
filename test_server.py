#!/usr/bin/env python
try:
    # Python 3
    from http.server import HTTPServer, SimpleHTTPRequestHandler, test as test_orig
    import sys
    def test (*args):
        print(f"Please Make Sure {int(sys.argv[1])} port is available otherwise change the port number")
        
        print("Web APP :---------------------------")
        print("Click on following Web APP if server gets connected")
        print(f'http://localhost:{int(sys.argv[1])}/project/Solar_System/index.html')
        print("---------------------------------------")
        test_orig(*args, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000)
        
except ImportError: # Python 2
    from BaseHTTPServer import HTTPServer, test
    from SimpleHTTPServer import SimpleHTTPRequestHandler

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    test(CORSRequestHandler, HTTPServer)
